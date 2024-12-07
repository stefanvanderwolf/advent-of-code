local describe = require("lib.test")
local Vec2 = require("lib.vec2")

describe("addition", function(it)
  it("should add vec2", function()
    local a = Vec2.new(5, 2)
    local b = Vec2.new(3, 1)
    local expected = Vec2.new(8, 3)

    local c = a + b

    assert(c == expected, string.format("Expected %s, but was %s", expected, c))
  end)
end)

describe("substract", function(it)
  it("should substract vec2", function()
    local a = Vec2.new(5, 2)
    local b = Vec2.new(3, 1)
    local expected = Vec2.new(2, 1)

    local c = a - b

    assert(c == expected, string.format("Expected %s, but was %s", expected, c))
  end)
end)

describe("equality", function(it)
  it("should be equal", function()
    local a = Vec2.new(5, 2)
    local b = Vec2.new(5, 2)

    assert(a == b)
  end)

  it("should be different", function()
    local a = Vec2.new(3, 2)
    local b = Vec2.new(5, 4)

    assert(a ~= b)
  end)
end)

describe("copy", function(it)
  it("should copy a vec2", function()
    local a = Vec2.new(5, 2)
    local b = a:copy()

    b.x = 6

    assert(a ~= b)
  end)
end)

describe("hash", function(it)
  it("should tohash a vec2", function()
    local expected = "Vec2(5, 2)"

    local s = Vec2.new(5, 2):tohash()

    assert(s == expected, string.format("Expected %s, but was %s", expected, s))
  end)
end)

describe("string", function(it)
  it("should tostring a vec2", function()
    local expected = "Vec2(5, 2)"

    local s = tostring(Vec2.new(5, 2))

    assert(s == expected, string.format("Expected %s, but was %s", expected, s))
  end)
end)
