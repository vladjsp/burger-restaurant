const Categories = ({ value, onCategorySelection }) => {
  const categories = ["Всі", "М'ясні", "Сирні", "Веганські"];

  return (
    <div className='categories'>
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={index}
            onClick={() => onCategorySelection(index)}
            className={value === index ? "active" : ""}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
