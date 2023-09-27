import React, { useState } from "react";


function ControllAccordion({ items,Accordion }) {
  const [activeIndex, setActiveIndex] = useState(null); //控制變數

  // 渲染時active={index(數字) === activeIndex(null)}(false)全部關閉，
  // 點擊時出發判斷帶入自身index參數，讓被點擊的元件成為唯一有帶入參數的元件，重新渲染後只會有被點擊的展開
  //   (全部回初始值，只有點擊的元件有帶參數讓active = true)

  const handleAccordionClick = (index) => {
    if (index === activeIndex) {
      setActiveIndex(null);
      //   console.log("1.關閉");
    } else {
      setActiveIndex(index);
      //   console.log("2.展開");
    }
  };

  //   console.log("3.渲染");

  return (
    <div>
      {items && items.map((item, index) => (
        <Accordion
          key={index} //物件序列
          item={item} //資料
          active={index === activeIndex} //控制變數
          onClick={() => handleAccordionClick(index)} //控制函式(點擊帶入自身元件序列參數)
        />
      ))}
    </div>
  );
}

export default ControllAccordion;
