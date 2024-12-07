local describe = require("lib.test")
local p1 = require(".2024.07.p1")

describe("input", function(it)
  it("example", function()
  local example = [[190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20]]
    local expected = 3749

    local n = p1.solve(example)

    assert(n == expected, string.format("Expected %d, but was %d", expected, n))
  end)

  it("input", function()
    local fp = io.open("./2024/07/assets/input.txt", "r") or error("Input not found")
    local input = fp:read("*a")
    local expected = 7710205485870

    local n = p1.solve(input)

    assert(n == expected, string.format("Expected %d, but was %d", expected, n))
  end)
end)
