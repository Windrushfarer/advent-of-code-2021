function parseInput() {
  return fs.readFileSync(path.join(__dirname, 'test.txt'), 'utf8')
}

const VERSION_BOUNDS = [0, 3]
const TYPE_ID_BOUNDS = [3, 6]
const HEADER_SKIP = TYPE_ID_BOUNDS[1]
const PACKETS_LENGTH_SKIP = 15
const PACKETS_COUNT_SKIP = 11

class Packet {
  constructor(version, typeId) {
    this.version = version
    this.typeId = typeId
    this.packets = []
    this.value = 0
  }
}

function parsePackets(input, totalSubpackets = -1) {
  const packets = []
  let totalPackets = 0
  const initialLength = input.length

  while (
    input.length > 0 &&
    (totalSubpackets < 0 || totalPackets < totalSubpackets)
  ) {
    const version = parseInt(input.substring(...VERSION_BOUNDS), 2)
    const typeId = parseInt(input.substring(...TYPE_ID_BOUNDS), 2)

    const packet = new Packet(version, typeId)
    totalPackets++;
    input = input.substring(HEADER_SKIP);

    if (typeId === 4) {
      let binaryLiteral = "";

      while (input.charAt(0) === "1") {
        binaryLiteral += input.substring(1, 5);
        input = input.substring(5);
      }

      binaryLiteral += input.substring(1, 5);
      input = input.substring(5);
      packet.value = parseInt(binaryLiteral, 2);
    } else {
      const lengthTypeId = input.charAt(0)
      input = input.substring(1)

      if (lengthTypeId === "0") {
        const packetsLength = parseInt(input.substring(0, 15), 2)
        input = input.substring(15)

        const subpackets = input.substring(0, packetsLength)
        const { packets } = parsePackets(subpackets)

        packet.packets = packets
        input = input.substring(packetsLength);
      } else {
        const subPacketsCount = parseInt(input.substring(0, 11), 2);
        input = input.substring(11);

        const { packets, left } = parsePackets(input, subPacketsCount)
        packet.packets = packets
        input = input.substring(left)
      }

      switch (typeId) {
        case 0: {
          packet.value = packet.packets.reduce((sum, p) => sum + p.value, 0)
          break
        }
        case 1: {
          packet.value = packet.packets.reduce((prod, p) => prod * p.value, 1)
          break
        }
        case 2: {
          packet.value = Math.min(...packet.packets.map(p => p.value))
          break
        }
        case 3: {
          packet.value = Math.max(...packet.packets.map(p => p.value))
          break
        }
        case 5: {
          const [first, second] = packet.packets
          packet.value = first.value > second.value ? 1 : 0
          break
        }
        case 6: {
          const [first, second] = packet.packets
          packet.value = first.value < second.value ? 1 : 0
          break
        }
        case 7: {
          const [first, second] = packet.packets
          packet.value = first.value === second.value ? 1 : 0
          break
        }
      }
    }

    packets.push(packet);
  }

  return {
    packets,
    left: initialLength - input.length
  }
}

function sumVersions(packets) {
  return packets
    .map((p) => p.version + sumVersions(p.packets))
    .reduce((a, b) => a + b, 0);
}

function hexToBinary(hex) {
  return [...hex]
    .map((n) => parseInt(n, 16).toString(2).padStart(4, "0"))
    .join('')
}

function partOne() {
  const input = parseInput()
  const binary = hexToBinary(input)
  const { packets } = parsePackets(binary)

  return sumVersions(packets)
}

function partTwo() {
  const input = parseInput()
  const binary = hexToBinary(input)
  const { packets } = parsePackets(binary)


  return packets[0].value
}

partOne()
partTwo()