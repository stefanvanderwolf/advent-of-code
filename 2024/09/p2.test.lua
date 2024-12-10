local describe = require("lib.test")
local p2 = require(".2024.09.p2")

describe("input", function(it)
  it("example 1", function()
    local example = "2333133121414131402"
    local expected = 2858

    local n = p2.solve(example)

    assert(n == expected, string.format("Expected %d, but was %d", expected, n))
  end)

  it("example 2", function()
    local example = "12345"
    local expected = 132

    local n = p2.solve(example)

    assert(n == expected, string.format("Expected %d, but was %d", expected, n))
  end)

  it("example 3", function()
    local example = "14113"
    local expected = 16

    local n = p2.solve(example)

    assert(n == expected, string.format("Expected %d, but was %d", expected, n))
  end)

  it("example 3", function()
    local example = "2333133121414131401"

    local expected = 2746

    local n = p2.solve(example)

    assert(n == expected, string.format("Expected %d, but was %d", expected, n))
  end)

  it("input", function()
    local fp = io.open("./2024/09/assets/input.txt", "r") or error("Input not found")
    local input = fp:read("*a")
    local expected = 6351801932670

    local n = p2.solve(input)

    assert(n == expected, string.format("Expected %d, but was %d", expected, n))
  end)
end)
