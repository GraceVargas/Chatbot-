
export const test = (req, res) => {
    try {
        return res.status(200).json({ message: "Cookie recibida" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error interno al Registrar" });
    }
}