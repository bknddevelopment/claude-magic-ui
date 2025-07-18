#!/usr/bin/env node

// Demo script to test Claude Magic UI
import { ComponentGenerator } from './src/index';

async function demo() {
  console.log('🎨 Claude Magic UI Demo\n');
  
  const generator = new ComponentGenerator();
  
  // Test cases
  const testCases = [
    'create a blue button',
    'create a red button with loading state',
    'create a large green button',
    'create a pricing table with 3 tiers'
  ];
  
  for (const testCase of testCases) {
    console.log(`\n🔍 Testing: "${testCase}"`);
    console.log('─'.repeat(50));
    
    try {
      const result = await generator.quickGenerate(testCase);
      
      console.log(`✅ Generated ${result.variants.length} variants:`);
      result.variants.forEach((variant, index) => {
        console.log(`  ${index + 1}. ${variant.name}: ${variant.description}`);
      });
      
      console.log(`\n📋 Metadata:`);
      console.log(`  - Type: ${result.metadata.componentType}`);
      console.log(`  - Framework: ${result.metadata.framework}`);
      console.log(`  - Styling: ${result.metadata.styling}`);
      console.log(`  - Features: ${result.metadata.features.join(', ') || 'none'}`);
      console.log(`  - Responsive: ${result.metadata.responsive ? 'Yes' : 'No'}`);
      console.log(`  - Accessible: ${result.metadata.accessibility ? 'Yes' : 'No'}`);
      
      console.log(`\n📦 Integration:`);
      result.integrationInstructions.forEach((instruction, index) => {
        console.log(`  ${instruction}`);
      });
      
    } catch (error) {
      console.error('❌ Error:', error.message);
    }
  }
  
  console.log('\n🎉 Demo complete!');
}

demo().catch(console.error);