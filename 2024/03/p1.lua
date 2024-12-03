local p1 = {}

--- Solve Mull It Over
---
--- @param input string
--- @return integer
p1.solve = function(input)
  local n = 0

  for a, b in string.gmatch(input, "mul%((%d+),(%d+)%)") do
    n = n + (a * b)
  end

  return n
end

return p1
