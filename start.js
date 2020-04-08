(() => {
  function setup() {
    const canvas = document.getElementById("falling-snow-canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    return {
      canvas, //canvas เป็นแค่ตัว set ค่า ความสูงและความกว้าง
      canvasContext: canvas.getContext("2d"), // เวลาวาดรูประไรก็แล้วแต่ใช้ canvasContext แทน
      numberOfSnowBalls: 250, // จำนวนหิมะ
    };
  }

  function random(min, max) {
    //function random ค่า
    // Math.floor เป็นการ ปัดเศษลง

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function createSnowBalls(canvas, numberOfSnowBalls) {
    //สร้างหิมะ sonowball
    //สร้าง Array ขึ้นมา
    return [...Array(numberOfSnowBalls)].map(() => {
      return {
        x: random(0, canvas.width),
        y: random(0, canvas.height),
        opacity: random(0.5, 1), //จางเข้ม
        radius: random(2, 4), //ความใหญลูกบอล
        speedX: random(-5, 5),
        speedY: random(1, 3),
      };
    });
  }

  function drawSnowBall(canvasContext, snowBall) {
    //การนำมาวาดหิมะลงในกระดาษใช้ canvasContext
    //เป็นการบอกว่าจะเริ่ม set ตัว canvasContext
    canvasContext.beginPath();
    canvasContext.arc(snowBall.x, snowBall.y, snowBall.radius, 0, Math.PI * 2); //.arc เป็น function ในการวาดวงกลม พารามิเตอร์ตัวแรกรับพิกัด x ตัวที่สองพิกัด y ตัวที่สามความใหญ่ของลูก snowball คือ 4  ตัวที่สี่เป็นตัวกำหนดเร่มต้น 0 ตัวที่ห้า จบวงกลม
    canvasContext.fillStyle = `rgba(255,255,255 ,${snowBall.opacity}`; // .fillStyle set ค่าลูกบอลที่จะวาดเป็นสีอะไร
    canvasContext.fill();
  }

  function moveSnowBall(canvas, snowBall) {
    snowBall.x += snowBall.speedX;
    snowBall.y += snowBall.speedY;
    if (snowBall.x > canvas.width) {
      snowBall.x = 0;
    } else if (snowBall.x < 0) {
      snowBall.x = canvas.width;
    }

    if (snowBall.y > canvas.height) {
      snowBall.y = 0;
    }
  }

  function run() {
    //ฟังชั้นเริ่มต้น

    const { canvas, canvasContext, numberOfSnowBalls } = setup();
    const snowBalls = createSnowBalls(canvas, numberOfSnowBalls);
    // const drawSnowBall = createSnowBalls()

    setInterval(() => {
      canvasContext.clearRect(0, 0, canvas.width, canvas.height);
      snowBalls.forEach((snowBall) => drawSnowBall(canvasContext, snowBall));
      snowBalls.forEach((snowBall) => moveSnowBall(canvas, snowBall));
    }, 50);
  }
  run();
})();
