export const aboutMe = async (id) => {
    if (!id) {
       return null 
    }
  try {
    const res = await fetch(
      `http://localhost:9000/api/auth/about/${id}`,
      {
        method: "GET",
      }
    );
    const x = await res.json();
    return x.user;
  } catch (error) {
    console.error(error.message);
  }
};
export const deleteAccount = async (id) => {
    if (!id) {
       return null 
    }
  try {
    const res = await fetch(
      `http://localhost:9000/api/auth/delete/${id}`,
      {
        method: "DELETE",
      }
    );
    const x = await res.json();
    return x.user;
  } catch (error) {
    console.error(error.message);
  }
};