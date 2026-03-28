document.addEventListener("DOMContentLoaded", () => {
    heroCircle();
    heroStars();
    createSmell();
    chooseBottle();
    testPerfume();
    runningEnd();
});

let feelingsArr = [];

function heroCircle() {
    const runningTextHero = document.getElementById("running-text-hero");
    const text = [...runningTextHero.textContent];

    runningTextHero.innerHTML = text.map(item =>`<span class="running-line-item running-line-item-hero">${item}</span>`).join("");

    const runningHeroArr = document.querySelectorAll(".running-line-item-hero");
    const fontSize = parseFloat(getComputedStyle(runningHeroArr[0]).fontSize);;
    const radius = (runningHeroArr.length * fontSize * 0.8) / (2 * Math.PI);
    const size = radius * 2 + fontSize * 4;
    const degree = 360 / runningHeroArr.length;

    runningTextHero.style.width = `${size}px`;
    runningTextHero.style.height = `${size}px`;

    for (let i = 0; i < runningHeroArr.length; i++) {
        const angle = i * degree - 90;

        runningHeroArr[i].style.transform = `
        rotate(${angle}deg)
        translate(${radius}px)
        rotate(90deg)
        `;

        runningHeroArr[i].style.animationDelay = `${i * 0.2}s`;
    }
}

function heroStars() {
    const hero = document.getElementById("hero");
    
    
    let canCreate = true;

    hero.addEventListener("mousemove", (e) => {
        if (!canCreate) return;
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        createStar(hero, x, y);
        canCreate = false;
        setTimeout(()=> {
            canCreate=true;
        }, 500);
    } );
}

function createSmell() {
  const feelings = document.querySelectorAll(".feeling");
  const flask = document.querySelector(".img-lab");
  const counter = document.getElementById("counter");
  let counterNumber = 0;

  feelings.forEach((feeling) => {
    feeling.addEventListener("dragstart", (e) => {
      if (feeling.classList.contains("used")) {
        e.preventDefault();
        return;
      }

      e.dataTransfer.setData("text/plain", feeling.id);
    });
  });

  flask.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  flask.addEventListener("drop", (e) => {
    e.preventDefault();

    if (counterNumber >= 5) {
        return;
    }

    const feelingId = e.dataTransfer.getData("text/plain");
    const feeling = document.getElementById(feelingId);

    feeling.classList.add("used");
    feelingsArr.push(feeling.dataset.name);

    counterNumber++;
    counter.textContent = `${counterNumber}/5`;

    flask.src = `images/lab${counterNumber}.svg`;
  });
};

function chooseBottle() {
    const bottle1 = document.getElementById("bottle-1");
    const bottle2 = document.getElementById("bottle-2");
    const bottle3 = document.getElementById("bottle-3");
    const bottle4 = document.getElementById("bottle-4");
    const bottle5 = document.getElementById("bottle-5");
    const bottle6 = document.getElementById("bottle-6");
    const bottlesArr = document.querySelectorAll(".img-package");
    const chosen = document.querySelector(".img-final");


    bottlesArr.forEach(el => {
        el.addEventListener("click", () => {
            const previousActive = document.querySelector(".active-bottle");
            if (previousActive) {
                previousActive.classList.remove("active-bottle");

                if (previousActive === bottle1) {
                    bottle1.src = "images/inactive1.svg";
                } else if (previousActive === bottle2) {
                    bottle2.src = "images/inactive2.svg";
                } else if (previousActive === bottle3) {
                    bottle3.src = "images/inactive3.svg";
                } else if (previousActive === bottle4) {
                    bottle4.src = "images/inactive4.svg";
                } else if (previousActive === bottle5) {
                    bottle5.src = "images/inactive5.svg";
                } else if (previousActive === bottle6) {
                    bottle6.src = "images/inactive6.svg";
                }
            }

            el.classList.add("active-bottle");
            if (el === bottle1) {
                bottle1.src = "images/active1.svg";
                chosen.src = "images/chosen1.svg";
            } else if (el === bottle2) {
                bottle2.src = "images/active2.svg";
                chosen.src = "images/chosen2.svg";
            } else if (el === bottle3) {
                bottle3.src = "images/active3.svg";
                chosen.src = "images/chosen3.svg";
            } else if (el === bottle4) {
                bottle4.src = "images/active4.svg";
                chosen.src = "images/chosen4.svg";
            } else if (el === bottle5) {
                bottle5.src = "images/active5.svg";
                chosen.src = "images/chosen5.svg";
            } else if (el === bottle6) {
                bottle6.src = "images/active6.svg";
                chosen.src = "images/chosen6.svg";
            }
        });
    });
}

function testPerfume() {
    const final = document.getElementById("final");

    final.addEventListener("click", (e) => {
        const rect = final.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const randomElementNum = Math.floor(Math.random() * 2);

        if (randomElementNum === 0 && feelingsArr.length > 0) {
            createWord(final, x, y);
        } else {
            createStar(final, x, y);
        }
    });
}

function runningEnd() {
    const runningTextEnd = document.getElementById("running-text-end");
    const text = [...runningTextEnd.textContent];

    runningTextEnd.innerHTML = text.map(item =>`<span class="running-line-item running-line-item-end ">${item}</span>`).join("");

    const runningEndArr = document.querySelectorAll(".running-line-item-end");

    for (let i = 0; i < runningEndArr.length; i++) {
        runningEndArr[i].style.animationDelay = `${i * 0.2}s`;
    }

}

function createStar(container, x, y) {
    const star = document.createElement("img");
    const randomStar = Math.floor(Math.random() * 3);

    star.classList.add("final-item");

    if (randomStar === 0) {
        star.classList.add("star-l");
    } else if (randomStar === 1) {
        star.classList.add("star-m");
    } else {
        star.classList.add("star-s");
    }

    star.src = "images/star.svg"
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;

    container.appendChild(star);

    setTimeout(() => {
        star.remove();
    }, 3000);
}

function createWord(container, x, y) {
    const word = document.createElement("div");
    const randomWord = feelingsArr[Math.floor(Math.random() * feelingsArr.length)];

    word.classList.add("final-item", "final-word");
    word.textContent = randomWord;
    word.style.left = `${x}px`;
    word.style.top = `${y}px`;

    container.appendChild(word);

    setTimeout(() => {
        word.remove();
    }, 3000);
}

