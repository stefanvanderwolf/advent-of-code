local describe = require("lib.test")
local p2 = require(".2024.06.p2")

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
    local expected = 6

    local n = p2.solve(example)

    assert(n == expected, string.format("Expected %d, but was %d", expected, n))
  end)

  it("input", function()
    local fp = io.open("./2024/06/assets/input.txt", "r") or error("Input not found")
    local input = fp:read("*a")
    local expected = 1909

    local n = p2.solve(input)

    assert(n == expected, string.format("Expected %d, but was %d", expected, n))
  end)
end)
