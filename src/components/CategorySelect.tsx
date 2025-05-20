import { useEffect, useState } from "react";
import { ChevronDownIcon } from "@primer/octicons-react";
import { useClickOutside } from "./hooks/useOutsideClick";

import CategoryModal from "./modals/CategoryModal";
import type { Category } from "../types/Category";
import { useLocalStorage } from "./hooks/useLocalStorage";

type CategorySelectProps = {
  onSelectCategory: (id: string) => void;
  categoryId?: string;
  full?: boolean;
  selectOnly?: boolean;
};

const CategorySelect = ({
  onSelectCategory,
  categoryId,
  full,
  selectOnly,
}: CategorySelectProps) => {
  const [isOpen, toggleOpen] = useState<boolean>(false);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>("");

  const [lsCategories, setLSCategories] = useLocalStorage("categories", "");

  const toggleOpenDropdown = () => {
    toggleOpen((prev) => !prev);
  };

  useEffect(() => {
    if (categoryId?.length) {
      setActiveCategory(categoryId);
    }
  }, [categoryId]);

  const handleSelectCategory = (categoryId: string) => {
    if (categoryId === activeCategory) {
      setActiveCategory("");
      onSelectCategory("");
    } else {
      setActiveCategory(categoryId);
      onSelectCategory(categoryId);
    }
    toggleOpen(false);
  };

  const handleOpenAddCategory = () => {
    toggleOpen(false);
    setDialogOpen(true);
  };

  const handleCloseCategoryModal = () => {
    setDialogOpen(false);
  };

  const handleCategoryModalSubmit = (category: Category) => {
    setLSCategories([...lsCategories, category]);
  };

  const ref = useClickOutside<HTMLDivElement>(() => toggleOpen(false));

  return (
    <div className={`min-w-48 ${full ? "w-full" : ""} relative`}>
      {activeCategory.length !== 0 && selectOnly ? (
        <label htmlFor="categories-button" className="text-sm py-1 text-black">
          Categories
        </label>
      ) : null}
      <button
        id="categories-button"
        data-dropdown-toggle="dropdown-states"
        onClick={toggleOpenDropdown}
        className="mb-2 flex items-center mt-2 justify-between w-full hover:border-black! border-2 border-black text-black rounded-sm p-2 px-4 shadow-[2px_2px_0px_rgba(0,0,0,1)]"
      >
        <>
          {activeCategory?.length
            ? lsCategories.find((cat: Category) => cat.id === activeCategory)
                .name
            : "Categories"}
          <ChevronDownIcon size={16} className="text-black font-black" />
        </>
      </button>
      {isOpen && (
        <div ref={ref}>
          <ul className="rounded-sm absolute top-3 left-0 bg-white mt-12 z-20 text-black w-full cursor-pointer border-2 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            {lsCategories &&
              lsCategories.map((category: Category) => {
                return (
                  <li
                    key={category.id}
                    onClick={() => handleSelectCategory(category.id)}
                    className={`border-b-2 border-b-black hover:bg-green-400 ${
                      activeCategory === category.id ? "bg-green-400" : ""
                    } p-1 px-4`}
                  >
                    {category.name}
                  </li>
                );
              })}
            {(!selectOnly || (selectOnly && lsCategories.length === 0)) && (
              <li
                key="addNewCategory"
                onClick={() => handleOpenAddCategory()}
                className="border-b-2 border-b-black bg-blue-500 text-white p-1 px-4"
              >
                Add new category
              </li>
            )}
          </ul>
        </div>
      )}
      {isDialogOpen && (
        <CategoryModal
          onCancel={() => handleCloseCategoryModal()}
          onClose={() => handleCloseCategoryModal()}
          onSubmit={(category) => handleCategoryModalSubmit(category)}
        />
      )}
    </div>
  );
};

export default CategorySelect;
