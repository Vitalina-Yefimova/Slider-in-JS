const slider = document.querySelector('.slider')
const prevBtn = document.querySelector('.btnPrev')
const nextBtn = document.querySelector('.btnNext')
const buttons = document.querySelectorAll('.button')
const autoplayCheckbox = document.getElementById('autoplay')
const slidesArr = Array.from(document.querySelectorAll('.slide'))
let current = 0 // Индекс текущего слайда
const length = slidesArr.length
const imgWidth = slider.clientWidth // Ширина слайдера (для расчёта сдвига)
let autoSlideInterval // Интервал для автопрокрутки
let isAutoplaying = false // Используется для отслеживания состояния автопрокрутки / показывает, идёт ли автопрокрутка 
let startX = 0
let endX = 0


function updateSliderPosition() {
  slider.style.transform = `translateX(-${current * imgWidth}px)`
  resetBg() 
  buttons[current].style.backgroundColor = '#242424' // Подсвечивается текущая точка
}

window.addEventListener('load', function() {
  updateSliderPosition() // Вызов функции после загрузки страницы
})

// Функция для обработки нажатия на кнопки с точками внизу
function onDotButtonClick(index) {
  current = index
  updateSliderPosition()
}

buttons.forEach(function(button, index) {
    button.addEventListener('click', function() {
      onDotButtonClick(index)
    })
})

// Функция для сброса фона всех точек
function resetBg() {
  buttons.forEach(function(button) {
    button.style.backgroundColor = 'transparent'
  })
}

function nextSlide() {
  current = (current + 1) % length
  updateSliderPosition()
}
nextBtn.addEventListener('click', nextSlide)

function prevSlide() {
  current = (current - 1 + length) % length
  updateSliderPosition()
}
prevBtn.addEventListener('click', prevSlide)

// Функция для старта автопрокрутки
function startAutoplay() {
  autoSlideInterval = setInterval(nextSlide, 3000) // Запускается автопрокрутка каждые 3 секунды
  isAutoplaying = true
}

// Функция для остановки автопрокрутки
function stopAutoplay() {
  clearInterval(autoSlideInterval) // Останавливается автопрокрутка
  isAutoplaying = false
}

// Функция для работы кнопки "Autoplay"
function onAutoplayCheckboxChange() {
  if (autoplayCheckbox.checked) {
    startAutoplay()
  } else {
    stopAutoplay()
  }
}
autoplayCheckbox.addEventListener('change', onAutoplayCheckboxChange)

// Функция для клавиш
function onKeyDown(event) {
  if (event.key === 'ArrowRight') {
    nextSlide()
  } else if (event.key === 'ArrowLeft') {
    prevSlide()
  }
}
document.addEventListener('keydown', onKeyDown)

// Функция для свайпов
function onTouchStart(event) {
  startX = event.touches[0].clientX
}

function onTouchEnd(event) {
  endX = event.changedTouches[0].clientX // Запоминает конечную точку касания
  if (startX > endX) {
    nextSlide();
  } else {
    prevSlide();
  }
}
slider.addEventListener('touchstart', onTouchStart)
slider.addEventListener('touchend', onTouchEnd)
