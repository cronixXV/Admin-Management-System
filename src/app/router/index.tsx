import { Routes, Route } from "react-router-dom";

const Stub = () => <div style={{ padding: 40 }}>App ready 🚀</div>;

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Stub />} />
    </Routes>
  );
};
