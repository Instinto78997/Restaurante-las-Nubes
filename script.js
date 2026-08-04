document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener('click', () => {
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  const form = document.getElementById('reservation-form');

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const data = new FormData(form);
      const name = data.get('name')?.toString().trim() || 'Cliente';
      const date = data.get('date')?.toString() || 'pronto';
      const time = data.get('time')?.toString() || 'a convenir';
      const guests = data.get('guests')?.toString() || '2';
      const message = data.get('message')?.toString().trim() || 'Sin observaciones adicionales.';

      const text = [
        'Hola Restaurante Las Nubes, quisiera reservar una mesa.',
        '',
        `Nombre: ${name}`,
        `Fecha: ${date}`,
        `Hora: ${time}`,
        `Personas: ${guests}`,
        '',
        `Mensaje: ${message}`
      ].join('%0A');

      window.open(`https://wa.me/50766702725?text=${encodeURIComponent(text)}`, '_blank');
      form.reset();
    });
  }
});
