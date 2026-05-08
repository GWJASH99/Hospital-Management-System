export const makeAppointment = async (data) => {
  try {
    const res = await fetch(`http://localhost:9000/api/user/appointment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const x = await res.json();
    return x;
  } catch (error) {
    console.error(error.message);
  }
};
export const getAppointments = async (id) => {
  try {
    const res = await fetch(
      `http://localhost:9000/api/user/appointment/${id}`,
      {
        method: "GET",
      }
    );
    const x = await res.json();
    return x;
  } catch (error) {
    console.error(error.message);
  }
};
export const getInfo = async (id) => {
  try {
    const res = await fetch(
      `http://localhost:9000/api/user/info/${id}`,
      {
        method: "GET",
      }
    );
    const x = await res.json();
    return x;
  } catch (error) {
    console.error(error.message);
  }
};
export const getMedicine = async (id) => {
  try {
    const res = await fetch(
      `http://localhost:9000/api/user/medicine/${id}`,
      {
        method: "GET",
      }
    );
    const x = await res.json();
    return x;
  } catch (error) {
    console.error(error.message);
  }
};
export const getDoctorAppointments = async (id) => {
  try {
    const res = await fetch(
      `http://localhost:9000/api/doctor/appointment/${id}`,
      {
        method: "GET",
      }
    );
    const x = await res.json();
    return x;
  } catch (error) {
    console.error(error.message);
  }
};
export const deleteAppointments = async (id) => {
  try {
    const res = await fetch(
      `http://localhost:9000/api/user/appointment/${id}`,
      {
        method: "DELETE",
      }
    );
    const x = await res.json();
    return x;
  } catch (error) {
    console.error(error.message);
  }
}
export const buyMedicines = async (id) => {
  try {
    const res = await fetch(
      `http://localhost:9000/api/user/medicine/${id}`,
      {
        method: "PUT",
      }
    );
    const x = await res.json();
    return x;
  } catch (error) {
    console.error(error.message);
  }
}
