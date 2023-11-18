export const getGroups = async (cb) => {
  const res = await fetch(`http://localhost:3000/group/get-groups`);
  const data = res.json();
  data.then((data) => cb(data));
};

export const registration = async (dto, cb) => {
  const res = await fetch(`http://localhost:3000/auth/registration`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(dto),
  });
  const data = res.json();
  data.then((data) => cb(data));
};

export const auth = async (dto, cb) => {
  const res = await fetch(`http://localhost:3000/auth/authorization`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(dto),
  });
  const data = res.json();
  data.then((data) => cb(data));
};

export const checkAuth = async (token, cb) => {
  const res = await fetch(`http://localhost:3000/auth/checkAuth`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      'Authorization': `Bearer ${token}`,
    },
  });
  const data = res.json();
  data.then((data) => cb(data));
};
