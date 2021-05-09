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
    if (businesses?.status !== 200) {
      return [];
    }

    // Combine everything.
    let everything = resolvedBusinesses.data.map(x => ({
      ...x,
      resolved: true
    }));

    let unresolved = businesses.data.slice(10);
    everything.push(unresolved.map(x => ({
      id: x,
      resolved: false
    })));

    return everything;
  } catch (err) {
    return null;
  }
}

export async function resolve(businesses, start, count) {
  try {
    // Determine the businesses requested.
    let requested = businesses.slice(start, start + count);
    requested = requested.map(x => x.id);

    // Resolve the businesses.
    let response = await http.post("businesses/resolve", requested);
    if (!response || response.status !== 200) {
      return businesses;
    }

    // Reduce the response.
    let reduced = response.data.reduce((p, c) => {
      p[c.id] = c;
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