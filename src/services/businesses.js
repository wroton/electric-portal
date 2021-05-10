import http from "./http";

export async function list() {
  try {
    // Get the businesses the user can see.
    let businesses = await http.get("businesses");
    if (businesses?.status !== 200) {
      return [];
    }

    // If there are ten, get the first ten. Otherwise get them all.
    let toResolve = businesses.data.slice(0, 10);
    let resolvedBusinesses = await http.post("businesses/resolve", toResolve);
    if (resolvedBusinesses?.status !== 200) {
      return [];
    }

    // Combine everything.
    let everything = resolvedBusinesses.data.map(x => ({
      ...x,
      resolved: true
    }));

    let unresolved = businesses.data.slice(10);
    return everything.concat(unresolved.map(x => ({
      id: x,
      resolved: false
    })));
  } catch (err) {
    return null;
  }
}

export async function resolve(businesses, start, count) {
  try {
    // Determine the businesses requested and filter out ones that are already resolved.
    const sliced = businesses.slice(start, start + count);
    const requested = sliced.filter(x => !x.resolved).map(x => x.id);

    // If there are none to get, return.
    if (!requested || requested.length == 0) {
      return businesses;
    }

    // Resolve the businesses.
    let response = await http.post("businesses/resolve", requested);
    if (!response || response.status !== 200) {
      return businesses;
    }

    // Index the response by id.
    let reduced = response.data.reduce((p, c) => {
      p[c.id] = c;
      return p;
    }, {});

    // Merge the businesses.
    return businesses.map(b => ({
      ...b,
      ...reduced[b.id],
      resolved: b.resolved || reduced[b.id] !== undefined
    }));
  } catch (err) {
    return null;
  }
}

export default {
  list,
  resolve
};