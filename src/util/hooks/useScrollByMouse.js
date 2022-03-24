import { useEffect } from "react";

const useScrollByMouse = (props) => {
  useEffect(() => {
    const closeList = document.querySelectorAll(".ant-table-body");
    closeList.forEach((element, index) => {
      let isDown = false;
      let startX;
      let scrollLeft;

      element.addEventListener("mousedown", (e) => {
        isDown = true;
        element.classList.add("active");
        startX = e.pageX - element.offsetLeft;
        scrollLeft = element.scrollLeft;
      });
      element.addEventListener("mouseleave", () => {
        isDown = false;
        element.classList.remove("active");
      });
      element.addEventListener("mouseup", () => {
        isDown = false;
        element.classList.remove("active");
      });
      element.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - element.offsetLeft;
        const walk = (x - startX) * 1.5; //scroll-fast
        element.scrollLeft = scrollLeft - walk;
      });
    });
  }, [props]);

  return null;
};

export { useScrollByMouse };

// const slider = document.querySelector(".ant-table-content");
// if (slider) {
//   let isDown = false;
//   let startX;
//   let scrollLeft;
//   slider.addEventListener("mousedown", (e) => {
//     isDown = true;
//     slider.classList.add("active");
//     startX = e.pageX - slider.offsetLeft;
//     scrollLeft = slider.scrollLeft;
//   });
//   slider.addEventListener("mouseleave", () => {
//     isDown = false;
//     slider.classList.remove("active");
//   });
//   slider.addEventListener("mouseup", () => {
//     isDown = false;
//     slider.classList.remove("active");
//   });
//   slider.addEventListener("mousemove", (e) => {
//     if (!isDown) return;
//     e.preventDefault();
//     const x = e.pageX - slider.offsetLeft;
//     const walk = (x - startX) * 1.5; //scroll-fast
//     slider.scrollLeft = scrollLeft - walk;
//   });
// }
