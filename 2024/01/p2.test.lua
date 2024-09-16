local p2 = require("./2024/01/p2")

io.write("--- 2024/01/p2.lua ---\n")

do
  io.write("- example:\n")
  io.write("> sum distance value:")

  local example = [[3   4
4   3
2   5
1   3
3   9
3   3
]]
  local n = p2.solve(example)
  local expected = 31
  assert(n == expected, string.format("Expected %d, but was %d", expected, n))
  io.write("ok\n")
end

do
  io.write("\n- input: \n")
  io.write("> sum distance value:")
  local file = io.open("./2024/01/assets/input.txt", "r")
  assert(file ~= nil, "Unable to open input")
  local input = file:read("*a")
  local n = p2.solve(input)
  local expected = 19457120
  assert(n == expected, string.format("Expected %d, but was %d", expected, n))
  io.write("ok\n")
end
