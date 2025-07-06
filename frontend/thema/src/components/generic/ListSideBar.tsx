import React from "react";

type ListSidebarProps<T> = {
  title: string;
  items: T[];
  getKey: (item: T) => React.Key; // should be a function that returns id
  renderItem: (item: T) => React.ReactNode; // what to be rendered (i.e. the name)
  onItemClick: (item: T) => void; // When item is clicked (i.e. set State Variable)
  onCreateClick?: () => void;
  createLabel?: string;
};

function ListSidebar<T>({
  title,
  items,
  getKey,
  renderItem,
  onItemClick,
  onCreateClick,
  createLabel = "Neu",
}: ListSidebarProps<T>): React.ReactElement {
  return (
    <aside style={{ width: "200px", backgroundColor: "#eee", padding: "1rem" }}>
      <h3>{title}</h3>
      <ul data-cy="booking-list">
        {items.map((item) => (
          <li
            key={getKey(item)}
            data-cy={getKey(item)}
            onClick={() => onItemClick(item)}
            style={{ cursor: "pointer", padding: "5px" }}
          >
            {renderItem(item)}
          </li>
        ))}
      </ul>
      {onCreateClick && <button onClick={onCreateClick}>{createLabel}</button>}
    </aside>
  );
}

export default ListSidebar;
