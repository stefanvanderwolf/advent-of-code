local describe = require("lib.test")
local p1 = require(".2024.03.p1")

describe("input", function(it)
  it("example", function()
    local example = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"
    local expected = 161

    local n = p1.solve(example)

    assert(n == expected, string.format("Expected %d, but was %d", expected, n))
  end)

  it("input", function()
    local fp = io.open("./2024/03/assets/input.txt", "r") or error("Input not found")
    local input = fp:read("*a")
    local expected = 190604937

    local n = p1.solve(input)

    assert(n == expected, string.format("Expected %d, but was %d", expected, n))
  end)
end)
