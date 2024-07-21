import React, { useState } from "react";
import "../css files/Taxform.css";

function Taxform() {
  const [taxName, setTaxName] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [applyToAll, setApplyToAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const items = [
    { name: "Jasinthe Bracelet", category: "bracelets" },
    { name: "Jasinthe Bracelet", category: "bracelets" },
    { name: "Inspire Bracelet", category: "bracelets" },
    { name: "Zero amount item with questions", category: "others" },
    { name: "Normal item with questions", category: "others" },
    { name: "Normal item", category: "others" },
  ];

  const handleItemChange = (item) => {
    setSelectedItems((prevItems) =>
      prevItems.includes(item)
        ? prevItems.filter((i) => i !== item)
        : [...prevItems, item]
    );
  };

  const handleSubmit = () => {
    alert(
      `Applying ${taxRate}% tax to ${
        applyToAll ? "all items" : selectedItems.length + " item(s)"
      }`
    );
  };

  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="App">
      <div className="add-tax-container">
        <h2>Add Tax</h2>
        <div className="input-group">
          <input
            type="text"
            className="tax-name-input"
            placeholder="Tax Name"
            value={taxName}
            onChange={(e) => setTaxName(e.target.value)}
          />
          <div className="tax-rate-container">
            <input
              type="number"
              className="tax-rate-input"
              placeholder="Tax Rate"
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
            />
            <span className="percent-sign">%</span>
          </div>
        </div>
        <div className="radio-group">
          <label class="radio-label">
            <input
              type="checkbox"
              checked={applyToAll}
              onChange={() => setApplyToAll(true)}
            />
            <div class="checkmark"></div>
            Apply to all items in collection
          </label>
          <label class="radio-label">
            <input
              type="checkbox"
              checked={!applyToAll}
              onChange={() => setApplyToAll(false)}
            />
            <div class="checkmark"></div>
            Apply to all items in collection
          </label>
        </div>
        <div className="items-list-search">
          <input type="text" placeholder="Search Items" />
        </div>
        {!applyToAll && (
          <div className="items-list">
            {Object.keys(groupedItems).map((category) => (
              <div key={category} className="item-category">
                <label>
                  <input
                    type="checkbox"
                    checked={groupedItems[category].every((item) =>
                      selectedItems.includes(item.name)
                    )}
                    onChange={() => {
                      const allSelected = groupedItems[category].every((item) =>
                        selectedItems.includes(item.name)
                      );
                      const updatedSelection = allSelected
                        ? selectedItems.filter(
                            (item) =>
                              !groupedItems[category].some(
                                (i) => i.name === item
                              )
                          )
                        : [
                            ...selectedItems,
                            ...groupedItems[category].map((i) => i.name),
                          ];
                      setSelectedItems(updatedSelection);
                    }}
                  />
                  <div className="catageory">
                    {category === "bracelets" ? "Bracelets" : "Others"}
                  </div>
                </label>
                {groupedItems[category].map((item) => (
                  <label key={item.name} className="item">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.name)}
                      onChange={() => handleItemChange(item.name)}
                    />
                    {item.name}
                  </label>
                ))}
              </div>
            ))}
          </div>
        )}
        <button onClick={handleSubmit}>
          Apply tax to {applyToAll ? "all" : selectedItems.length} item(s)
        </button>
      </div>
    </div>
  );
}

export default Taxform;