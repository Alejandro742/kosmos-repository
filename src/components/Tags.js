const Tags = ({ color, id, removeElement }) => {
  return (
    <div className="header__tag" style={{ color: color }} key={id}>
      <span>{color.toUpperCase()}</span>
      <span
        onClick={() => removeElement(id)}
        className="header__tag__delete"
        style={{ fontSize: "8px" }}
      >
        ❌
      </span>
    </div>
  );
};

export default Tags;
