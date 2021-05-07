import http from "./http";

export async function list() {
  try {
    // Get the businesses the user can see.
    let businesses = await http.get("businesses");
    if (businesses?.status !== 200) {
      return [];
    }

    // Resolve all of them.
    let resolvedBusinesses = await http.post("businesses/resolve", businesses.data);
    if (businesses?.status !== 200) {
      return [];
    }

    return resolvedBusinesses;
  } catch (err) {
    return null;
  }
}

export default {
  list
};