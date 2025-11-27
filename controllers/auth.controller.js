import jwt from "jsonwebtoken";

export const login = (req, res) => {
  const { username, password } = req.body;

  //uso una validacion hardcodeada
  if (username === "admin" && password === "admin123") {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.json({ token });
  }

  return res.status(401).json({ error: "Credenciales inválidas" });
};
