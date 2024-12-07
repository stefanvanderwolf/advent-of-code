local p1 = require(".2024.07.p1")

io.write("--- 2024/07/p1.lua ---\n")

do
  io.write("- example:\n")
  local example = [[190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20
]]
  local n = p1.solve(example)
  local expected = 3749
  assert(n == expected, string.format("Expected %d, but was %d", expected, n))
  io.write("ok\n")
end

do
  io.write("\n- input: \n")
  local file = io.open("./2024/07/assets/input.txt", "r")
  assert(file ~= nil, "Unable to open input")
  local input = file:read("*a")
  local n = p1.solve(input)
  local expected = 7710205485870
  assert(n == expected, string.format("Expected %d, but was %d", expected, n))
  io.write("ok\n")
end
