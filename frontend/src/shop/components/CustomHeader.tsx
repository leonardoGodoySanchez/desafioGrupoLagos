import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";


export const CustomHeader = () => {
  return <header className="sticky top-0 z-50 w-full border-b backdrop-blur bg-slate-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold tracking-tight">productos</h1>
          </div>

        </div>
      </div>
    </header>;
};
