local describe = require("lib.test")
local p2 = require(".2024.01.p2")

describe("input", function(it)
  it("example", function ()
    local example = [[3   4
4   3
2   5
1   3
3   9
3   3]]
    local expected = 31

    local n = p2.solve(example)

    assert(n == expected, string.format("Expected %d, but was %d", expected, n))
  end)

  it("input", function ()
    local fp = io.open("./2024/01/assets/input.txt", "r") or error("Input not found")
    local input = fp:read("*a")
    local expected = 19457120

    local n = p2.solve(input)

    assert(n == expected, string.format("Expected %d, but was %d", expected, n))
  end)
end)
