const input = document.getElementById('input-checkbox');
const changeStatus = async (id, e) => {
  let status = e.checked 
    try {
      const response = await fetch(`/skater/status/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      alert('Skater actualizado satisfactoriamente');
      window.location.href = "/";
    } catch (error) {
      alert(error.message);
    };
  };