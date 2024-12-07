local describe = require("lib.test")
local p1 = require(".2024.02.p1")

describe("input", function(it)
  it("example", function()
    local example = [[7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
]]
    local expected = 2

    local n = p1.solve(example)

    assert(n == expected, string.format("Expected %d, but was %d", expected, n))
  end)

  it("input", function()
    local fp = io.open("./2024/02/assets/input.txt", "r") or error("Input not found")
    local input = fp:read("*a")
    local expected = 639

    local n = p1.solve(input)

    assert(n == expected, string.format("Expected %d, but was %d", expected, n))
  end)
end)
