export const getDoctors = async ()=>{
    try {
        const res = await fetch('http://localhost:9000/api/admin/doctors')
        const data = await  res.json()
        return data
    } catch (error) {
        console.error(error.message)
    }
}
export const getMedicine = async ()=>{
    try {
        const res = await fetch('http://localhost:9000/api/admin/medicine')
        const data = await  res.json()
        return data
    } catch (error) {
        console.error(error.message)
    }
}
export const giveMedicine = async (data)=>{
 try {
    const res = await fetch(`http://localhost:9000/api/doctor/medicine`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const x = await res.json();
    return x;
  } catch (error) {
    console.error(error.message);
  }
}
export const getPatients = async ()=>{
    try {
        const res = await fetch('http://localhost:9000/api/admin/patients')
        const data = await  res.json()
        return data
    } catch (error) {
        console.error(error.message)
    }
}
export const getAppointment = async ()=>{
    try {
        const res = await fetch('http://localhost:9000/api/admin/appointment')
        const data = await  res.json()
        return data
    } catch (error) {
        console.error(error.message)
    }
}
export const getSessions = async ()=>{
    try {
        const res = await fetch('http://localhost:9000/api/admin/sessions')
        const data = await  res.json()
        return data
    } catch (error) {
        console.error(error.message)
    }
}
export const deleteDoctor = async (id)=>{
    try {
        const res = await fetch(`http://localhost:9000/api/admin/doctor/${id}`,{
            method: "DELETE",
        })
        const data = await  res.json()
        return data
    } catch (error) {
        console.error(error.message)
    }
}
export const deleteUser = async (id)=>{
    try {
        const res = await fetch(`http://localhost:9000/api/admin/doctor/${id}`,{
            method: "DELETE",
        })
        const data = await  res.json()
        return data
    } catch (error) {
        console.error(error.message)
    }
}
export const deleteSessions = async (id)=>{
    try {
        const res = await fetch(`http://localhost:9000/api/admin/sessions/${id}`,{
            method: "DELETE",
        })
        const data = await  res.json()
        return data
    } catch (error) {
        console.error(error.message)
    }
}
export const getDoctorSessions = async (id)=>{
     try {
        const res = await fetch(`http://localhost:9000/api/doctor/sessions/${id}`)
        const data = await  res.json()
        return data
    } catch (error) {
        console.error(error.message)
    }
}
export const getInfo = async () => {
  try {
    const res = await fetch(
      `http://localhost:9000/api/admin/info`,
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
export const givMedicines = async (id) => {
  try {
    const res = await fetch(
      `http://localhost:9000/api/admin/medicine/${id}`,
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