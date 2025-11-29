export default function Footer() {
  return (
    <footer className="mt-10 border-t">
      <div className="max-w-6xl mx-auto p-4 text-xs text-center text-slate-500">
        © {new Date().getFullYear()} ProFinder • Connect with the right professionals
      </div>
    </footer>
  );
}
