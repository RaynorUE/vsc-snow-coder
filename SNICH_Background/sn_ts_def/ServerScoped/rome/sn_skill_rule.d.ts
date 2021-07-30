declare namespace sn_skill_rule {

	/** 
	 * The SkillDeterminationUtils API requires the Skill Determination (com.snc.skill_determination) plugin and is provided within the sn_skill_rule namespace.
	 * 
	 */
	class SkillDeterminationUtils {
	
		/**
		 *
		 *
		 */
		constructor()
		
		/**
		 *
		 * Assigns an array of active skill objects to a work item.
		 *
		 * @param {{[fieldName: string]: string}} skills Array of active skill objects to be assigned.
		 * @param {string} skill.skillName Name of the skill.
		 * @param {string} skill.skillSysId Sys ID of the skill.
		 * @param {boolean} skill.mandatory True if the skill is mandatory, false otherwise.
		 * @param {string} skill.skillLevelName Optional skill level name.
		 * @param {string} skill.skillLevelSysId Optional skill level Sys ID.
		 * @param {GlideRecord} now_GR GlideRecord of the work item on which to assign skills.
		 *
		 * @returns {void} 
		 */
		assignSkillsToWorkItem(skills: {[fieldName: string]: string}, now_GR: GlideRecord): void
		
		/**
		 *
		 * Gets skills for a specified work item, indicates if the skills are mandatory, and lists any skill levels.
		 *
		 * @param {GlideRecord} now_GR GlideRecord of a work item from any interaction or task table extension.
		 *
		 * @returns {{[fieldName: string]: string}} One or more skill objects.
		 * 
		 * *   skillSysId: String. Sys ID of the skill from the Skills [cmn_skill] table.
		 * *   skillName: String. Name of the skill.
		 * *   mandatory: Boolean. True if mandatory, false otherwise.
		 * *   skillLevelName: If skill exists, name of the skill level.
		 * *   skillLevelSysId: If skill exists, Sys ID of the skill level from the Skill Levels [cmn_skill_level] table.
		 */
		determineWorkItemSkills(now_GR: GlideRecord): {[fieldName: string]: string}
		
	}
	
}