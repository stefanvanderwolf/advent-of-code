local describe = require("lib.test")
local p1 = require(".2024.06.p1")

describe("input", function(it)
  it("example", function()
  local example = [[....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...]]
    local expected = 41

    local n = p1.solve(example)

    assert(n == expected, string.format("Expected %d, but was %d", expected, n))
  end)

  it("input", function()
    local fp = io.open("./2024/06/assets/input.txt", "r") or error("Input not found")
    local input = fp:read("*a")
    local expected = 5162

    local n = p1.solve(input)

    assert(n == expected, string.format("Expected %d, but was %d", expected, n))
  end)
end)
