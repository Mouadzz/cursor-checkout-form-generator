function generateLuhnChecksum(number) {
  function luhnChecksum(cardNum) {
    const digits = cardNum.toString().split("").map(Number);
    const oddDigits = digits
      .slice()
      .reverse()
      .filter((_, i) => i % 2 === 0);
    const evenDigits = digits
      .slice()
      .reverse()
      .filter((_, i) => i % 2 === 1);
    let checksum = oddDigits.reduce((sum, digit) => sum + digit, 0);
    checksum += evenDigits.reduce((sum, digit) => {
      const doubled = digit * 2;
      const doubledDigits = doubled.toString().split("").map(Number);
      return sum + doubledDigits.reduce((s, d) => s + d, 0);
    }, 0);
    return checksum % 10;
  }

  for (let i = 0; i < 10; i++) {
    const testNumber = number + i;
    if (luhnChecksum(testNumber) === 0) {
      return i.toString();
    }
  }
  return "0";
}

function generateCardNumber() {
  const bin = "559888039";
  const remainingLength = 16 - bin.length - 1; // 16 total - 9 BIN - 1 checksum = 6 digits

  let middleDigits = "";
  for (let i = 0; i < remainingLength; i++) {
    middleDigits += Math.floor(Math.random() * 10);
  }

  const partialNumber = bin + middleDigits;
  const checksum = generateLuhnChecksum(partialNumber);

  return partialNumber + checksum;
}

function generateExpirationDate() {
  const month = Math.floor(Math.random() * 12) + 1;
  const year = Math.floor(Math.random() * 5) + 2026; // 2026-2030
  return { month, year };
}

function generateCVV() {
  return Math.floor(Math.random() * 900) + 100;
}

function generateCards(quantity = 10) {
  const cards = [];
  for (let i = 0; i < quantity; i++) {
    const cardNumber = generateCardNumber();
    const { month, year } = generateExpirationDate();
    const cvv = generateCVV();

    cards.push({
      number: cardNumber,
      month: month.toString().padStart(2, "0"),
      year: year.toString(),
      cvv: cvv.toString(),
    });
  }
  return cards;
}

function generateRandomName() {
  // Common but not famous first names
  const firstNames = [
    "Ryan",
    "Brandon",
    "Justin",
    "Tyler",
    "Jacob",
    "Nicholas",
    "Anthony",
    "Zachary",
    "Kyle",
    "Kevin",
    "Megan",
    "Rachel",
    "Lauren",
    "Samantha",
    "Nicole",
    "Stephanie",
    "Danielle",
    "Brittany",
    "Amanda",
    "Kayla",
    "Connor",
    "Nathan",
    "Caleb",
    "Luke",
    "Hunter",
    "Aaron",
    "Ethan",
    "Isaac",
    "Mason",
    "Noah",
    "Emma",
    "Olivia",
    "Sophia",
    "Isabella",
    "Ava",
    "Mia",
    "Charlotte",
    "Amelia",
    "Harper",
    "Evelyn",
    "Logan",
    "Sebastian",
    "Gabriel",
    "Mateo",
    "Leo",
    "Lucas",
    "Henry",
    "Alexander",
    "Jackson",
    "Owen",
    "Grace",
    "Chloe",
    "Camila",
    "Penelope",
    "Riley",
    "Layla",
    "Lillian",
    "Nora",
    "Zoey",
    "Mila",
  ];

  // Common last names (not the super famous ones)
  const lastNames = [
    "Anderson",
    "Taylor",
    "Thomas",
    "Hernandez",
    "Moore",
    "Martin",
    "Jackson",
    "Thompson",
    "White",
    "Lopez",
    "Lee",
    "Gonzalez",
    "Harris",
    "Clark",
    "Lewis",
    "Robinson",
    "Walker",
    "Perez",
    "Hall",
    "Young",
    "Allen",
    "King",
    "Wright",
    "Scott",
    "Torres",
    "Nguyen",
    "Hill",
    "Flores",
    "Green",
    "Adams",
    "Nelson",
    "Baker",
    "Gutierrez",
    "Carter",
    "Mitchell",
    "Roberts",
    "Turner",
    "Phillips",
    "Campbell",
    "Parker",
    "Evans",
    "Edwards",
    "Collins",
    "Stewart",
    "Sanchez",
    "Morris",
    "Rogers",
    "Reed",
    "Cook",
    "Morgan",
    "Bell",
    "Murphy",
    "Bailey",
    "Rivera",
    "Cooper",
    "Richardson",
    "Cox",
    "Howard",
    "Ward",
    "Torres",
  ];

  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
}

async function fetchRandomAddress() {
  try {
    const proxyUrl = "https://api.allorigins.win/get?url=";
    const targetUrl = `https://www.bestrandoms.com/random-address-in-us?quantity=10&t=${Date.now()}`;
    const response = await fetch(proxyUrl + encodeURIComponent(targetUrl));
    const data = await response.json();

    const parser = new DOMParser();
    const doc = parser.parseFromString(data.contents, "text/html");
    const contentDiv = doc.querySelector(".content");

    if (!contentDiv) {
      return null;
    }

    const addresses = [];
    const liElements = contentDiv.querySelectorAll("li.col-sm-6");

    liElements.forEach((li) => {
      const addressData = {};
      const spans = li.querySelectorAll("span");

      spans.forEach((span) => {
        const text = span.textContent.trim();
        if (text.startsWith("Street:")) {
          addressData.street = text.replace("Street:", "").trim();
        } else if (text.startsWith("State/province/area:")) {
          addressData.state = text.replace("State/province/area:", "").trim();
        } else if (text.startsWith("Zip code:")) {
          addressData.zip_code = text.replace("Zip code:", "").trim();
        }
      });

      if (Object.keys(addressData).length > 0) {
        addresses.push(addressData);
      }
    });

    if (addresses.length > 0) {
      const randomAddress =
        addresses[Math.floor(Math.random() * addresses.length)];
      const randomName = generateRandomName();
      return { name: randomName, address: randomAddress };
    }

    return null;
  } catch (error) {
    console.error("Error fetching addresses:", error);
    return null;
  }
}
