local describe = require("lib.test")
local p2 = require(".2024.03.p2")

describe("input", function(it)
  it("example", function()
    local example = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"
    local expected = 48

    local n = p2.solve(example)

    assert(n == expected, string.format("Expected %d, but was %d", expected, n))
  end)

  it("input", function()
    local fp = io.open("./2024/03/assets/input.txt", "r") or error("Input not found")
    local input = fp:read("*a")
    local expected = 82857512

    local n = p2.solve(input)

    assert(n == expected, string.format("Expected %d, but was %d", expected, n))
  end)
end)
