export default function ThemeProvider({ children }) {
  // Dark mode ثابت دائمًا
  document.documentElement.className = "dark";
  return children;
}
