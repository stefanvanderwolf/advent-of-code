local describe = require("lib.test")
local p1 = require(".2024.04.p1")

describe("input", function(it)
  it("example", function()
  local example = [[MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX]]
    local expected = 18

    local n = p1.solve(example)

    assert(n == expected, string.format("Expected %d, but was %d", expected, n))
  end)

  it("input", function()
    local fp = io.open("./2024/04/assets/input.txt", "r") or error("Input not found")
    local input = fp:read("*a")
    local expected = 2496

    local n = p1.solve(input)

    assert(n == expected, string.format("Expected %d, but was %d", expected, n))
  end)
end)

