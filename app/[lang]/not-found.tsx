import { PillButton } from "@/components/ui/Primitives";

/** 404 inside the language layout. Bilingual, since the segment may not have resolved a language. */
export default function NotFound() {
  return (
    <main
      id="main"
      className="page-width flex min-h-[70vh] flex-col items-start justify-center gap-6 pt-32"
    >
      <p className="eyebrow">404</p>
      <h1 className="text-heading md:text-heading-lg">This page doesn't exist.</h1>
      <p className="text-stone">Trang này không tồn tại.</p>
      <PillButton href="/">Back to home · Về trang chủ</PillButton>
    </main>
  );
}
