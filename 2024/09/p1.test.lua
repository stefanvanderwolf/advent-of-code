local describe = require("lib.test")
local p1 = require(".2024.09.p1")

describe("input", function(it)
  it("example 1", function()
    local example = "2333133121414131402"
    local expected = 1928

    local n = p1.solve(example)

    assert(n == expected, string.format("Expected %d, but was %d", expected, n))
  end)

  it("input", function()
    local fp = io.open("./2024/09/assets/input.txt", "r") or error("Input not found")
    local input = fp:read("*a")
    local expected = 6323641412437

    local n = p1.solve(input)

    assert(n == expected, string.format("Expected %d, but was %d", expected, n))
  end)
end)
