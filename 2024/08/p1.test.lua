local describe = require("lib.test")
local p1 = require(".2024.08.p1")

describe("input", function(it)
  it("example 1", function()
    local example = [[..........
..........
..........
....a.....
..........
.....a....
..........
..........
..........
..........]]
    local expected = 2

    local n = p1.solve(example)

    assert(n == expected, string.format("Expected %d, but was %d", expected, n))
  end)

  it("example 2", function()
    local example = [[..........
..........
..........
....a.....
........a.
.....a....
..........
..........
..........
..........]]
    local expected = 4

    local n = p1.solve(example)

    assert(n == expected, string.format("Expected %d, but was %d", expected, n))
  end)

  it("example 3", function()
    local example = [[..........
..........
..........
....a.....
........a.
.....a....
..........
......A...
..........
..........]]
    local expected = 4

    local n = p1.solve(example)

    assert(n == expected, string.format("Expected %d, but was %d", expected, n))
  end)

  it("example 4", function()
    local example = [[............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............]]
    local expected = 14

    local n = p1.solve(example)

    assert(n == expected, string.format("Expected %d, but was %d", expected, n))
  end)

  it("example 5", function()
    local example = [[............
............
............
............
............
......A.....
............
......A.....
............
............
............
............]]
    local expected = 2

    local n = p1.solve(example)

    assert(n == expected, string.format("Expected %d, but was %d", expected, n))
  end)
  it("example 6", function()
    local example = [[............
............
............
............
............
......A.....
......A.....
............
............
............
............
............]]
    local expected = 2

    local n = p1.solve(example)

    assert(n == expected, string.format("Expected %d, but was %d", expected, n))
  end)

  it("input", function()
    local fp = io.open("./2024/08/assets/input.txt", "r") or error("Input not found")
    local input = fp:read("*a")
    local expected = 256

    local n = p1.solve(input)

    assert(n == expected, string.format("Expected %d, but was %d", expected, n))
  end)
end)