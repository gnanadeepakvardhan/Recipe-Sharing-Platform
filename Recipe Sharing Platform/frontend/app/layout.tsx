import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'RecipeHub - Share Your Favorite Recipes',
  description: 'A platform to share and discover amazing recipes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
