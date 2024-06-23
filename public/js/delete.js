const deleteSkater = document.getElementById('deleteBtn');

deleteSkater.addEventListener('click', async () => {
    try {
      const id = document.getElementById('update-id').value;
      const response = await fetch(`/delete/${id}`, {
        method: 'DELETE',
      });
      alert('Skater eliminado satisfactoriamente');
      window.location.href = "/";
    } catch (error) {
      alert(error.message);
    };
  });