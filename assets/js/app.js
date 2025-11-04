const { createApp, ref, onMounted } = Vue;

createApp({
  setup() {
    // Estado
    const now = ref(new Date().toLocaleString());
    const clockBusy = ref(false);

    const loading = ref({ weather: false, usd: false });
    const error   = ref({ weather: '', usd: '' });

    const cityLabel = ref('Santiago, CL'); // visible en UI
    const coords    = ref({ lat: -33.45, lon: -70.66 }); // por defecto

    const weather = ref(null);
    const usd     = ref(null);

    const newTask = ref('');
    const tasks   = ref([]);

    // Utils
    const formatNumber = (n) =>
      new Intl.NumberFormat('es-CL', { maximumFractionDigits: 2 }).format(n);

    // Reloj
    setInterval(() => {
      clockBusy.value = true;
      now.value = new Date().toLocaleString();
      clockBusy.value = false;
    }, 1000);

    // APIs
    async function getWeather() {
      error.value.weather = '';
      loading.value.weather = true;
      try {
        const { lat, lon } = coords.value;
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('No se pudo obtener el clima.');
        const data = await res.json();
        const cw = data.current_weather;
        weather.value = {
          temperature: cw.temperature,
          windspeed: cw.windspeed,
          winddirection: cw.winddirection,
          time: new Date(cw.time).toLocaleString()
        };
      } catch (e) {
        error.value.weather = e.message || 'Error de red al cargar clima.';
      } finally {
        loading.value.weather = false;
      }
    }

    async function getUSD() {
      error.value.usd = '';
      loading.value.usd = true;
      try {
        const url = 'https://open.er-api.com/v6/latest/USD';
        const res = await fetch(url);
        if (!res.ok) throw new Error('No se pudo obtener el tipo de cambio.');
        const data = await res.json();
        if (!data.rates || !data.rates.CLP) throw new Error('Respuesta inválida del servidor.');
        usd.value = { 
          rate: data.rates.CLP,
          date: new Date().toLocaleDateString()
        };
      } catch (e) {
        error.value.usd = e.message || 'Error de red al cargar USD.';
      } finally {
        loading.value.usd = false;
      }
    }

    // Geolocalización (opcional)
    function useGeolocation() {
      if (!navigator.geolocation) {
        error.value.weather = 'Geolocalización no soportada.';
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          coords.value = { lat: pos.coords.latitude, lon: pos.coords.longitude };
          cityLabel.value = 'Mi ubicación';
          getWeather();
        },
        () => { error.value.weather = 'No se pudo obtener tu ubicación.'; }
      );
    }

    // Tareas (localStorage)
    const STORAGE_KEY = 'dashboard_tasks_v1';

    function loadTasks() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        tasks.value = raw ? JSON.parse(raw) : [];
      } catch { tasks.value = []; }
    }

    function persistTasks() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks.value));
    }

    function addTask() {
      if (!newTask.value.trim()) return;
      tasks.value = [...tasks.value, { id: Date.now(), text: newTask.value.trim(), done: false }];
      newTask.value = '';
      persistTasks();
    }

    function removeTask(i) {
      tasks.value.splice(i, 1);
      persistTasks();
    }

    function clearDone() {
      tasks.value = tasks.value.filter(t => !t.done);
      persistTasks();
    }

    function resetTasks() {
      tasks.value = [];
      persistTasks();
    }

    // Helper
    function refreshAll() {
      getWeather();
      getUSD();
    }

    // Ciclo de vida
    onMounted(() => {
      loadTasks();
      refreshAll();
    });

    // Exponer a la plantilla
    return {
      // state
      now, clockBusy, loading, error, weather, usd, cityLabel, newTask, tasks,
      // methods
      getWeather, getUSD, useGeolocation, addTask, removeTask, clearDone, resetTasks, persistTasks, refreshAll,
      // utils
      formatNumber
    };
  }
}).mount('#app');
