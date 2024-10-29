import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const SearchBar = () => {
  return (
    <section role="search" className="relative w-full h-14 flex flex-col bg-white">
        <div className="relative h-14 z-10 rounded-md">
            <Input className="absolute inset-0 h-full"/>
            <Button className="absolute right-0 inset-y-0 h-full rounded-1-none bg-teal-500 hover:bg-teal-600">
                <Search className="w-6 h-6"/>
            </Button>
        </div>
    </section>
  );
};

export default SearchBar;
