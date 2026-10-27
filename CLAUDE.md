@AGENTS.md

<!--
  공통 지침은 AGENTS.md에만 작성합니다. (Codex와 Claude Code가 함께 사용)
  이 파일에는 Claude Code에만 해당하는 내용만 추가합니다.
-->

## Claude Code 전용
- 스킬은 `.claude/skills/`에서 `/add-portfolio-project`, `/update-experience`, `/add-tech-skill`, `/verify-portfolio`로 호출합니다. 실제 파일은 `.agents/skills/`에 있으므로 스킬 수정은 그쪽에서 합니다.
- `.claude/rules/`의 규칙은 `paths`에 맞는 파일을 읽거나 수정할 때 자동으로 로드됩니다.
