/**
 * Import example blocks
 */
const {useEffect} = wp.element;
import "./z-pattern";
import "./section-divider";
import "./testimonials";
import "./steps";


(function () {
    function positionAfterElement() {
      const h1s = document.querySelectorAll(".wp-block-post-content h1");
      if (!h1s.length) {
        return;
      }
  
      const range = document.createRange();
  
      h1s.forEach((h1) => {
        const textNode = h1.firstChild;
        const text = h1.textContent;
        if (!textNode || !text) return; // Skip if no content
  
        const words = text.split(" ");
        if (words.length === 0) return; // Skip if no words
        const lastWordStartIndex = text.lastIndexOf(words[words.length - 1]);
  
        try {
          // Set the range for the last word
          range.setStart(textNode, lastWordStartIndex);
          range.setEnd(textNode, text.length);
  
          // Calculate bounding box for the last word
          const rect = range.getBoundingClientRect();
          const parentRect = h1.getBoundingClientRect();
  
          // Calculate position and dimensions relative to the parent element
          const leftPosition = rect.left - parentRect.left;
          const width = rect.width;
  
          // Apply styles
          h1.style.setProperty("--after-left", `${leftPosition}px`);
          h1.style.setProperty("--after-width", `${width}px`);
        } catch (error) {
          console.error("Error setting range or calculating bounding box:", error);
        }
      });
    }
  
    // Execute when DOM is fully loaded
    document.addEventListener("DOMContentLoaded", () => {
      positionAfterElement();
    });
  
    // Adjust on window resize
    window.addEventListener("resize", positionAfterElement);
  
    // Adjust when Gutenberg updates
    const { subscribe } = wp.data;
    const isEditorReady = wp.data.select("core/editor")?.isCleanNewPost();
    if (isEditorReady !== undefined) {
      subscribe(() => {
        try {
          positionAfterElement();
        } catch (error) {
          console.error("Error running positionAfterElement on Gutenberg updates:", error);
        }
      });
    }
  })();