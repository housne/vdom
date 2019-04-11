export function mount(el: HTMLElement | Text, target: HTMLElement) {
  target.innerHTML = "";
  target.appendChild(el);
  return el;
}
