local p2 = require(".2024.07.p2")

io.write("--- 2024/07/p2.lua ---\n")

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
  local n = p2.solve(example)
  local expected = 11387
  assert(n == expected, string.format("Expected %d, but was %d", expected, n))
  io.write("ok\n")
end

do
  io.write("\n- input: \n")
  local file = io.open("./2024/07/assets/input.txt", "r")
  assert(file ~= nil, "Unable to open input")
  local input = file:read("*a")
  local n = p2.solve(input)
  local expected = 20928985450275
  assert(n == expected, string.format("Expected %d, but was %d", expected, n))
  io.write("ok\n")
end
